/**
 * kenya-val-lib-20260624b
 * A comprehensive utility library for validating Kenyan specific identifiers.
 * This library provides robust regex-based checks for National IDs, KRA PINs, and Phone numbers.
 */

const KenyaValidator = {
  /**
   * Validates a Kenyan National ID Number.
   * Most IDs are between 7 and 9 digits.
   * @param {string|number} id - The ID number to validate.
   * @returns {boolean}
   */
  isValidID: function(id) {
    if (!id) return false;
    const idStr = String(id).trim();
    
    // National IDs are typically 7 to 8 digits.
    // We allow 9 to account for future-proofing or specialized series.
    const idRegex = /^[0-9]{7,9}$/;
    return idRegex.test(idStr);
  },

  /**
   * Validates a Kenyan KRA PIN (Personal Identification Number).
   * Format: Starts with A (Individual) or P (Company/Non-Individual), 
   * followed by 9 digits, and ends with a letter.
   * @param {string} pin - The KRA PIN string.
   * @returns {boolean}
   */
  isValidKRAPIN: function(pin) {
    if (!pin || typeof pin !== 'string') return false;
    const cleanPin = pin.trim().toUpperCase();
    
    // Format: [A/P] [9 digits] [Any Letter]
    const kraRegex = /^[AP][0-9]{9}[A-Z]$/;
    
    return kraRegex.test(cleanPin);
  },

  /**
   * Validates Kenyan Mobile Numbers.
   * Supports formats: +254..., 254..., 07..., 01...
   * @param {string|number} phone - The phone number to validate.
   * @returns {boolean}
   */
  isValidMobile: function(phone) {
    if (!phone) return false;
    
    // Strip common formatting characters like spaces or dashes
    const sanitized = String(phone).replace(/[\s\-\(\)]/g, '');
    
    // Regex logic:
    // ^(?:\+254|254|0)?  -> Optional prefix (+254, 254, or 0)
    // (7|1)              -> Must start with 7 (classic) or 1 (new series)
    // [0-9]{8}$          -> Followed by exactly 8 digits
    const mobileRegex = /^(?:\+254|254|0)?(7|1)[0-9]{8}$/;
    
    return mobileRegex.test(sanitized);
  },

  /**
   * Normalizes Kenyan mobile numbers to the standard international format (+254).
   * Example: 0712345678 -> +254712345678
   * @param {string|number} phone - The phone number to format.
   * @returns {string|null} - The formatted number or null if invalid.
   */
  formatMobile: function(phone) {
    if (!this.isValidMobile(phone)) {
      return null;
    }

    let clean = String(phone).replace(/[\s\-\(\)]/g, '');
    
    if (clean.startsWith('+')) {
      clean = clean.substring(1);
    }

    if (clean.startsWith('0')) {
      clean = '254' + clean.substring(1);
    } else if (!clean.startsWith('254')) {
      clean = '254' + clean;
    }

    return `+${clean}`;
  },

  /**
   * Detects the mobile service provider based on the prefix.
   * @param {string|number} phone - The phone number.
   * @returns {string} - Provider name (Safaricom, Airtel, Telkom, Equitel, or Unknown).
   */
  getProvider: function(phone) {
    const formatted = this.formatMobile(phone);
    if (!formatted) return 'Unknown';

    // Prefix extraction from +254[XX]...
    const prefix = formatted.substring(4, 6);
    
    const safaricom = ['70', '71', '72', '74', '79', '11'];
    const airtel = ['73', '75', '78', '10'];
    const telkom = ['77'];
    const equitel = ['76'];

    if (safaricom.includes(prefix)) return 'Safaricom';
    if (airtel.includes(prefix)) return 'Airtel';
    if (telkom.includes(prefix)) return 'Telkom';
    if (equitel.includes(prefix)) return 'Equitel';

    return 'Unknown';
  }
};

// Export for CommonJS and Browser global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KenyaValidator;
} else if (typeof window !== 'undefined') {
  window.KenyaValidator = KenyaValidator;
}