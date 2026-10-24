export interface Guide {
  slug: string;
  name: string;
  language: string;
  configFile: string;
  configLabel: string;
  config: string;
  sendLabel: string;
  send: string;
  testCommand: string;
  notes: string[];
}

export const guides: Guide[] = [
  {
    slug: "laravel",
    name: "Laravel",
    language: "PHP",
    configFile: ".env",
    configLabel: "Laravel .env mail settings",
    config: `MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null`,
    sendLabel: "Laravel tinker command",
    send: `php artisan tinker
> Mail::raw('Hello from Laravel', fn ($m) => $m->to('ada@example.com')->subject('Welcome'));`,
    testCommand: "php artisan dusk",
    notes: [
      "Laravel's phpunit.xml sets MAIL_MAILER=array, so feature tests never reach SMTP. Assert on mail from end-to-end tests such as Dusk, which run against the app with your .env settings.",
      "Laravel Sail users can run RustMail as a service in docker-compose.yml and set MAIL_HOST to the service name.",
      "Keep MAIL_ENCRYPTION=null: RustMail only speaks STARTTLS when you give it a certificate.",
    ],
  },
  {
    slug: "django",
    name: "Django",
    language: "Python",
    configFile: "settings.py",
    configLabel: "Django email settings",
    config: `EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "localhost"
EMAIL_PORT = 1025
EMAIL_USE_TLS = False`,
    sendLabel: "Django sendtestemail command",
    send: `python manage.py sendtestemail ada@example.com`,
    testCommand: "pytest e2e/",
    notes: [
      "Django's test runner always swaps in the locmem backend, so manage.py test never reaches SMTP. Assert on mail from end-to-end tests that drive a running server, such as Playwright with pytest.",
    ],
  },
  {
    slug: "rails",
    name: "Ruby on Rails",
    language: "Ruby",
    configFile: "config/environments/development.rb",
    configLabel: "Rails Action Mailer settings",
    config: `config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  address: "localhost",
  port: 1025
}`,
    sendLabel: "Rails runner command",
    send: `bin/rails runner 'ActionMailer::Base.mail(from: "app@example.com", to: "ada@example.com", subject: "Welcome", body: "Hello from Rails").deliver_now'`,
    testCommand: "bin/rails test:system",
    notes: [
      "The test environment uses delivery_method :test by default; switch it to :smtp for the system tests that should reach RustMail.",
    ],
  },
  {
    slug: "nodejs",
    name: "Node.js",
    language: "JavaScript",
    configFile: "mailer.js",
    configLabel: "Nodemailer transport",
    config: `import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
});`,
    sendLabel: "Nodemailer send call",
    send: `await transport.sendMail({
  from: "app@example.com",
  to: "ada@example.com",
  subject: "Welcome",
  text: "Hello from Node.js",
});`,
    testCommand: "npm test",
    notes: ["The same host and port work with any SMTP client library, not only Nodemailer."],
  },
  {
    slug: "spring-boot",
    name: "Spring Boot",
    language: "Java",
    configFile: "application.properties",
    configLabel: "Spring Boot mail properties",
    config: `spring.mail.host=localhost
spring.mail.port=1025
spring.mail.properties.mail.smtp.auth=false
spring.mail.properties.mail.smtp.starttls.enable=false`,
    sendLabel: "Spring JavaMailSender call",
    send: `SimpleMailMessage message = new SimpleMailMessage();
message.setFrom("app@example.com");
message.setTo("ada@example.com");
message.setSubject("Welcome");
message.setText("Hello from Spring Boot");
mailSender.send(message);`,
    testCommand: "./mvnw verify",
    notes: ["Put these properties in a dev or test profile so production keeps its real SMTP settings."],
  },
];
