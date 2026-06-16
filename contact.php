<?php
header('Content-Type: application/json');

// ✅ YAHAN APNI REAL EMAIL LAGAYEIN
$to_email = "mkhurram200386@gmail.com";  // <-- Isko apni real email se replace karein

// Form data get karein
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';
$subject = isset($_POST['subject']) ? strip_tags(trim($_POST['subject'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validation
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all fields.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);
    exit;
}

// Email content
$email_subject = "New Contact Form Message: $subject";
$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #00c9ff, #92fe9d); padding: 20px; border-radius: 10px 10px 0 0; color: #0a0e17; }
        .header h2 { margin: 0; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #333; }
        .field-value { color: #555; margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #888; font-size: 14px; border-top: 1px solid #eee; margin-top: 20px; }
        .badge { display: inline-block; background: #00c9ff; color: #fff; padding: 5px 15px; border-radius: 20px; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📬 New Message from Portfolio</h2>
            <span class='badge'>Contact Form</span>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='field-label'>👤 Name</div>
                <div class='field-value'>$name</div>
            </div>
            <div class='field'>
                <div class='field-label'>📧 Email</div>
                <div class='field-value'>$email</div>
            </div>
            <div class='field'>
                <div class='field-label'>📌 Subject</div>
                <div class='field-value'>$subject</div>
            </div>
            <div class='field'>
                <div class='field-label'>💬 Message</div>
                <div class='field-value'>$message</div>
            </div>
            <div class='field'>
                <div class='field-label'>📅 Sent On</div>
                <div class='field-value'>" . date('F j, Y, g:i a') . "</div>
            </div>
            <div class='field'>
                <div class='field-label'>🌐 IP Address</div>
                <div class='field-value'>" . $_SERVER['REMOTE_ADDR'] . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This message was sent from your portfolio website contact form.</p>
            <p>&copy; " . date('Y') . " Muhammad Khurram</p>
        </div>
    </div>
</body>
</html>
";

// Headers for HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $name <$email>" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to_email, $email_subject, $email_body, $headers)) {
    echo json_encode([
        'success' => true,
        'message' => '✅ Thank you! Your message has been sent successfully. I will get back to you soon!'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => '❌ Sorry, something went wrong. Please try again or contact me directly.'
    ]);
}
?>
