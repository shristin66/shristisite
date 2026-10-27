import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { personal } from '../constants';
import { useSectionInView } from '../hooks/useSectionInView';
import { cn } from '../utils/cn';
import SectionHeading from './SectionHeading';
import { buttonVariants } from './ui/button';

// FormSubmit (formsubmit.co) forwards each message to this inbox, with the visitor's
// address as Reply-To. The first message sends an activation link to the inbox that
// has to be clicked once before messages start arriving (see README).
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${personal.email}`;

const sendMessage = async ({ email, message, honeypot }) => {
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      email,
      message,
      _subject: `New message from ${email} via ${personal.name}'s website`,
      _template: 'table',
      // FormSubmit drops submissions where this hidden field was filled in by a bot.
      _honey: honeypot,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || String(result.success) !== 'true') {
    throw new Error(result.message || `Request failed with status ${response.status}`);
  }
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { email: '', message: '' };

const validate = ({ email, message }) => {
  const errors = {};
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedEmail.length > 254) errors.email = 'Email is too long';
  else if (!trimmedEmail) errors.email = 'Email is required';
  else if (!EMAIL_PATTERN.test(trimmedEmail)) errors.email = 'Must be a valid email';

  if (!trimmedMessage) errors.message = 'Message is required';
  else if (trimmedMessage.length > 5000)
    errors.message = 'Please keep your message under 5,000 characters';

  return errors;
};

const labelClass =
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';

const Contact = () => {
  const { ref } = useSectionInView('Contact');
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const nextValues = { ...values, [event.target.name]: event.target.value };
    setValues(nextValues);
    // Validate on submit, then re-validate as the visitor fixes their input.
    if (submitted) setErrors(validate(nextValues));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      event.currentTarget.elements.namedItem(firstInvalid).focus();
      return;
    }

    const email = values.email.trim();
    const message = values.message.trim();
    const honeypot = event.currentTarget.elements.namedItem('_honey').value;

    setIsSubmitting(true);
    try {
      await sendMessage({ email, message, honeypot });
      toast.success("Thanks for reaching out! I'll get back to you soon.");
      setValues(EMPTY_FORM);
      setErrors({});
      setSubmitted(false);
    } catch {
      toast.error('Could not send your message. Please try again or email me directly.', {
        action: {
          label: 'Email me',
          onClick: () => {
            const subject = encodeURIComponent(`Portfolio message from ${email}`);
            const body = encodeURIComponent(message);
            window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
          },
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="my-6 w-full scroll-mt-28 sm:my-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}>
      <SectionHeading
        heading="Get In Touch"
        content={
          <>
            Please contact me directly at{' '}
            <a
              className={cn(
                buttonVariants({
                  variant: 'link',
                  className: 'text-brand hover:text-brand/80 p-0 font-medium',
                }),
                'underline-offset-4 hover:underline',
              )}
              href={`mailto:${personal.email}`}>
              {personal.email}
            </a>{' '}
            or through this form.
          </>
        }
      />
      <form onSubmit={handleSubmit} noValidate className="flex flex-col items-center gap-5">
        {/* Spam trap: hidden from people, but bots tend to fill it in. */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          defaultValue=""
        />
        <div className="w-full max-w-xl">
          <label htmlFor="email" className={cn(labelClass, errors.email && 'text-destructive')}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="hello@gmail.com"
            value={values.email}
            onChange={handleChange}
            className={cn(
              'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-10 w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm',
              errors.email && 'border-destructive',
            )}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-destructive mt-1 text-sm">
              {errors.email}
            </p>
          )}
        </div>
        <div className="w-full max-w-xl">
          <label htmlFor="message" className={cn(labelClass, errors.message && 'text-destructive')}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            placeholder="Hello! What's up?"
            value={values.message}
            onChange={handleChange}
            className={cn(
              'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-2 flex h-60 w-full resize-none rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm',
              errors.message && 'border-destructive',
            )}
          />
          {errors.message && (
            <p id="message-error" role="alert" className="text-destructive mt-1 text-sm">
              {errors.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={buttonVariants({ size: 'lg' })}>
          {isSubmitting ? 'Sending…' : 'Submit'} <ArrowRight className="ml-2 size-4" />
        </button>
      </form>
    </motion.section>
  );
};

export default Contact;
