package in.anant.moneymanager.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    // This method is now updated to send HTML emails
    public void sendEmail(String to, String subject, String htmlBody) {
        try {
            // Create a MimeMessage instead of a SimpleMailMessage
            MimeMessage mimeMessage = mailSender.createMimeMessage();

            // Use MimeMessageHelper to build the email
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);

            // IMPORTANT: The 'true' argument tells the helper that the text is HTML
            helper.setText(htmlBody, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Catch a more specific exception for email issues
            throw new RuntimeException("Failed to send email", e);
        }
    }
    public void sendEmailWithAttachment(String to, String subject, String htmlBody,
                                        byte[] attachmentData, String filename) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "utf-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            // ✅ Add attachment
            ByteArrayResource attachment = new ByteArrayResource(attachmentData);
            helper.addAttachment(filename, attachment);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email with attachment", e);
        }
    }

}