// src/assets/js/utils/name.js
export function formatName(name) {
    // Check if name is valid (non-null and non-undefined)
    if (!name || typeof name !== 'string') {
        console.error('Invalid name:', name);
        return ''; // Return an empty string or a fallback value
    }

    const nameParts = name.split(' ');
    const lastName = nameParts[0] || '';
    const firstName = nameParts[1] || '';
    const middleNames = nameParts.slice(2);

    const truncateMiddleName = (name) => {
        if (name.startsWith('Aa') || name.startsWith('Ae') || name.startsWith('Oe')) {
            return name.substring(0, 2) + '.';
        } else if (name.length > 0) {
            return name[0] + '.';
        } else {
            return '';
        }
    };

    const truncatedFirstName = firstName.length > 1 ? `${firstName[0]}.` : firstName;
    const truncatedMiddleNames = middleNames.map(truncateMiddleName).join(' ');
    const truncatedFullName = `${lastName} ${truncatedFirstName} ${truncatedMiddleNames}`.trim();
    const fullNameWithTruncatedMiddleNames = `${lastName} ${firstName} ${truncatedMiddleNames}`.trim();
    const fullName = `${lastName} ${firstName} ${middleNames.join(' ')}`.trim();

    if (lastName.length >= 18) {
        return lastName;
    }

    if (fullName.length >= 19 && fullNameWithTruncatedMiddleNames.length <= 19) {
        return fullNameWithTruncatedMiddleNames;
    }

    if (fullNameWithTruncatedMiddleNames.length >= 19) {
        return truncatedFullName;
    }

    return fullName;
}