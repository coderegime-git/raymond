/**
 * Email Action Handler
 * Ensures clicking mail envelope links opens email client,
 * copies the email address to clipboard, and offers webmail fallbacks (Gmail, Outlook Web).
 */
(function() {
    const targetEmail = 'theseilergroup@raymondjames.com';

    document.addEventListener('click', function(e) {
        const mailLink = e.target.closest('#email-link, a[href^="mailto:"]');
        if (!mailLink) return;

        const href = mailLink.getAttribute('href') || ('mailto:' + targetEmail);
        const email = href.replace(/^mailto:/i, '').split('?')[0] || targetEmail;

        // Copy email to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).catch(function() {});
        }

        // Show friendly email action toast with Gmail and Outlook web fallbacks
        showEmailToast(email);
    });

    window.showEmailToast = function(email) {
        let toast = document.getElementById('email-action-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'email-action-toast';
            toast.className = 'email-toast-container';
            document.body.appendChild(toast);
        }

        const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(email);
        const outlookUrl = 'https://outlook.live.com/mail/0/deeplink/compose?to=' + encodeURIComponent(email);

        toast.innerHTML = 
            '<div class="email-toast-header">' +
                '<span class="email-toast-title"><i class="fas fa-envelope"></i> EMAIL THE SEILER GROUP</span>' +
                '<button type="button" class="email-toast-close" onclick="closeEmailToast()" aria-label="Close">' +
                    '<i class="fas fa-times"></i>' +
                '</button>' +
            '</div>' +
            '<div class="email-toast-body">' +
                'Copied to clipboard: <span class="email-toast-address">' + email + '</span>' +
            '</div>' +
            '<div class="email-toast-actions">' +
                '<a href="' + gmailUrl + '" target="_blank" rel="noopener noreferrer" class="email-toast-btn email-toast-btn-primary">Open Gmail</a>' +
                '<a href="' + outlookUrl + '" target="_blank" rel="noopener noreferrer" class="email-toast-btn email-toast-btn-secondary">Outlook Web</a>' +
                '<a href="contact.html" class="email-toast-btn email-toast-btn-secondary">Contact Page</a>' +
            '</div>';

        toast.classList.add('show');

        if (window._emailToastTimeout) clearTimeout(window._emailToastTimeout);
        window._emailToastTimeout = setTimeout(function() {
            closeEmailToast();
        }, 8000);
    };

    window.closeEmailToast = function() {
        const toast = document.getElementById('email-action-toast');
        if (toast) {
            toast.classList.remove('show');
        }
    };
})();
