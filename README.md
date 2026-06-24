# kenya-val-lib-20260624b

A JavaScript utility library to validate Kenyan National ID numbers, KRA PINs, and mobile phone formats.

## Features
- **National ID Validation**: Supports 7-9 digit ID numbers.
- **KRA PIN Validation**: Validates the standard A/P format (e.g., A123456789B).
- **Mobile Phone Validation**: Supports +254, 254, 07, and 01 prefixes.
- **Mobile Normalization**: Formats local numbers to +254 international standard.
- **Provider Detection**: Identifies Safaricom, Airtel, Telkom, and Equitel.

## Installation

```bash
npm install
```

## Usage

```javascript
const KenyaValidator = require('./index.js');

// Validate ID
KenyaValidator.isValidID('12345678'); // true

// Validate KRA PIN
KenyaValidator.isValidKRAPIN('A001234567X'); // true

// Validate Mobile
KenyaValidator.isValidMobile('0712345678'); // true
KenyaValidator.isValidMobile('0112345678'); // true

// Format Mobile
KenyaValidator.formatMobile('0712345678'); // '+254712345678'

// Get Provider
KenyaValidator.getProvider('0722000000'); // 'Safaricom'
```

## License
MIT