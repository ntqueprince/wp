// WhatsApp number jahan data jayega (apna number daalo)
const OWNER_WHATSAPP = "917479712827"; // Format: country code + number (no + sign)

document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const customerName = document.getElementById('customerName').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const vehicleNumber = document.getElementById('vehicleNumber').value.trim().toUpperCase();
    const vehicleModel = document.getElementById('vehicleModel').value.trim();
    const odometer = document.getElementById('odometer').value.trim();
    const address = document.getElementById('address').value.trim();
    const insuranceExpiry = document.getElementById('insuranceExpiry').value;
    const notes = document.getElementById('notes').value.trim();
    
    // Format insurance date
    let insuranceText = "Not provided";
    if (insuranceExpiry) {
        const date = new Date(insuranceExpiry);
        insuranceText = date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
    
    // Create WhatsApp message
    const message = `🚗 *NEW CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━

👤 *Name:* ${customerName}
📱 *Mobile:* ${mobileNumber}
🔢 *Vehicle No:* ${vehicleNumber}
🚙 *Model:* ${vehicleModel}
⏱️ *Odometer:* ${odometer} KM
📍 *Address:* ${address || 'Not provided'}
📋 *Insurance Expiry:* ${insuranceText}
📝 *Notes:* ${notes || 'None'}

━━━━━━━━━━━━━━━━━━
✅ Sent via Customer Form`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
});

// Format vehicle number as user types
document.getElementById('vehicleNumber').addEventListener('input', function(e) {
    let value = e.target.value.toUpperCase();
    // Remove spaces and special characters except alphanumeric
    value = value.replace(/[^A-Z0-9]/g, '');
    e.target.value = value;
});

// Only allow numbers in mobile field
document.getElementById('mobileNumber').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});
