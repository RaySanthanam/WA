/**
 * Parse WhatsApp exported chat file
 * Format: [M/D/YY, H:MM:SS AM/PM] Name: message
 * Or: [DD/MM/YYYY, HH:MM:SS] Name: message (varies by locale)
 */

export function parseWhatsAppChat(chatText, yourName) {
  const lines = chatText.split('\n');
  const messages = [];

  // Regex patterns for different WhatsApp export formats
  const patterns = [
    // US format: [1/5/24, 2:30:15 PM] Name: message
    /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?)\]\s*([^:]+):\s*(.*)$/i,
    // 24h format: [05/01/2024, 14:30:15] Name: message
    /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?)\]\s*([^:]+):\s*(.*)$/,
    // Without brackets: 1/5/24, 2:30 PM - Name: message
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?)\s*-\s*([^:]+):\s*(.*)$/i,
  ];

  let currentMessage = null;

  for (const line of lines) {
    if (!line.trim()) continue;

    let matched = false;
    for (const pattern of patterns) {
      const match = line.match(pattern);
      if (match) {
        // Save previous message if exists
        if (currentMessage) {
          messages.push(currentMessage);
        }

        const [, date, time, sender, content] = match;
        const timestamp = parseTimestamp(date, time);
        const isOutgoing = sender.trim().toLowerCase() === yourName.toLowerCase();

        currentMessage = {
          id: messages.length,
          timestamp,
          date,
          time: formatTime(time),
          sender: sender.trim(),
          content: content.trim(),
          isOutgoing,
          type: detectMessageType(content),
          media: extractMediaFilename(content),
        };

        matched = true;
        break;
      }
    }

    // If no pattern matched, it's a continuation of the previous message
    if (!matched && currentMessage) {
      currentMessage.content += '\n' + line;
    }
  }

  // Don't forget the last message
  if (currentMessage) {
    messages.push(currentMessage);
  }

  // Sort messages by timestamp to ensure correct order
  messages.sort((a, b) => a.timestamp - b.timestamp);

  return messages;
}

function parseTimestamp(dateStr, timeStr) {
  try {
    // Handle various date formats
    const dateParts = dateStr.split('/');
    let month, day, year;

    // Assume M/D/YY or M/D/YYYY format (US)
    if (dateParts[0].length <= 2 && parseInt(dateParts[0]) <= 12) {
      [month, day, year] = dateParts;
    } else {
      // DD/MM/YYYY format
      [day, month, year] = dateParts;
    }

    // Fix 2-digit year
    if (year.length === 2) {
      year = parseInt(year) > 50 ? '19' + year : '20' + year;
    }

    // Parse time
    let hours, minutes, seconds = '00';
    const timeParts = timeStr.replace(/\s*(AM|PM)/i, '').split(':');
    hours = parseInt(timeParts[0]);
    minutes = timeParts[1];
    if (timeParts[2]) seconds = timeParts[2];

    // Handle AM/PM
    const isPM = /PM/i.test(timeStr);
    const isAM = /AM/i.test(timeStr);
    if (isPM && hours !== 12) hours += 12;
    if (isAM && hours === 12) hours = 0;

    return new Date(year, month - 1, day, hours, parseInt(minutes), parseInt(seconds));
  } catch {
    return new Date();
  }
}

function formatTime(timeStr) {
  // Keep hours:minutes, remove seconds if present
  // e.g., "2:30:45 PM" -> "2:30 PM", "14:30:15" -> "14:30"
  const cleaned = timeStr.trim();
  return cleaned.replace(/(\d{1,2}:\d{2}):\d{2}/, '$1');
}

function detectMessageType(content) {
  const lowerContent = content.toLowerCase();

  // Check for actual media files FIRST (before media-omitted)
  if (/\.(jpg|jpeg|png|gif|webp)/i.test(content)) {
    return 'image';
  }
  if (/\.(mp4|mov|avi|webm)/i.test(content)) {
    return 'video';
  }
  if (/\.(mp3|ogg|opus|m4a|oga)/i.test(content)) {
    return 'audio';
  }
  if (/\.(pdf|doc|docx|xls|xlsx)/i.test(content)) {
    return 'document';
  }
  // Only show media-omitted if there's no actual file
  if (lowerContent.includes('<media omitted>')) {
    return 'media-omitted';
  }
  if (lowerContent === 'this message was deleted') {
    return 'deleted';
  }
  if (lowerContent.includes('missed voice call') || lowerContent.includes('missed video call')) {
    return 'call';
  }

  return 'text';
}

function extractMediaFilename(content) {
  // Try to extract filename from message
  const match = content.match(/([\w\-. ]+\.(jpg|jpeg|png|gif|webp|mp4|mov|avi|webm|mp3|ogg|opus|oga|m4a|pdf|doc|docx|xls|xlsx))/i);
  return match ? match[1] : null;
}

/**
 * Group messages by date for rendering date separators
 */
export function groupMessagesByDate(messages) {
  const groups = [];
  let currentDate = null;
  let currentGroup = null;

  for (const message of messages) {
    const messageDate = message.timestamp.toDateString();

    if (messageDate !== currentDate) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      currentDate = messageDate;
      currentGroup = {
        date: formatDateHeader(message.timestamp),
        rawDate: message.timestamp,
        messages: [],
      };
    }

    currentGroup.messages.push(message);
  }

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
}

function formatDateHeader(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Search messages by keyword
 */
export function searchMessages(messages, query) {
  if (!query.trim()) return messages;

  const lowerQuery = query.toLowerCase();
  return messages.filter(msg =>
    msg.content.toLowerCase().includes(lowerQuery) ||
    msg.sender.toLowerCase().includes(lowerQuery)
  );
}
