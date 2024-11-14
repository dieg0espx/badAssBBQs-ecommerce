import React,{useEffect} from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  return (
    <div className="privacy-policy-container p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        At Badass BBQs, we prioritize the privacy and security of our customers. Our services are intended for individuals over the age of 18, and we kindly ask that those under 18 refrain from submitting personal information.
      </p>

      <p className="mb-4">
        Rest assured, any personal information you provide will not be sold or shared with third parties without your explicit consent. We collect personal data solely to process your purchases and ensure smooth shipping.
      </p>

      <p className="mb-4">
        If you have any questions or concerns, please reach out to us at <a href="mailto:info@badassbbqs.com" className="text-blue-500">info@badassbbqs.com</a> or call us toll-free at <a href="tel:877-659-2619" className="text-blue-500">877-659-2619</a>.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Third-Party Providers</h2>

      <p className="mb-4">
        To enhance your experience, we use third-party providers to display ads and send email alerts on our behalf. These providers may collect anonymous data about your visits to our website and interactions with our products. They may also use this information to serve targeted advertisements based on your interests. This data is gathered through common technologies like pixel tags.
      </p>

      <p className="mb-4">
        For more details on how this works and to learn about your options for opting out of data collection, please visit our website at <a href="http://www.badassbbqs.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">www.badassbbqs.com</a>.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Social Media Login</h2>

      <p className="mb-4">
        We also offer the option to log into our site using third-party social media accounts, such as Facebook. By linking your social media profile to your account, you can share content on external platforms and interact with friends from those networks.
      </p>

      <p className="mb-4">
        When you connect your social media account, we may access certain information from your profile, including your name, profile picture, email address, gender, friends list, wall posts, and news feed.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Automatically Collected Data</h2>

      <p className="mb-4">
        In addition to the information you provide directly, we may automatically collect data about your use of our website, such as your IP address, browser type, device information, operating system, mobile carrier, location, and browsing behavior. This helps us improve our services and tailor our offerings to better suit your preferences.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Advertising & Marketing</h2>

      <p className="mb-4">
        We may also work with data technology companies to gather and use information about your device and online activities for targeted advertising and marketing purposes. These partners may use cookies, web beacons, and similar technologies to collect data, which may be shared with us and other third parties for advertising purposes.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Policy Updates</h2>

      <p className="mb-4">
        This privacy policy may be updated periodically. Any significant changes will be posted on our website, so we encourage you to review this policy regularly to stay informed about how we protect your personal information. It is your responsibility to stay updated on any modifications.
      </p>

      <p>
        For questions or concerns regarding this privacy policy, feel free to contact us at <a href="mailto:info@badassbbqs.com" className="text-blue-500">info@badassbbqs.com</a> or call us toll-free at <a href="tel:877-659-2619" className="text-blue-500">877-659-2619</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
