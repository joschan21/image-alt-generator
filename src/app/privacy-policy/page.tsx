import { FC } from 'react'
import Link from 'next/link'

const page: FC = () => {
  return (
    <div className="text-slate-300">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4 text-slate-100">
          ImageToAlt Privacy Policy
        </h1>
        <p className="mb-4">
          ImageToAlt is a free online service that provides a simple way to
          generate an alt tag (a description of what is visible on an image,
          determined by a machine learning algorithm) from an image. In order to
          provide this service, we need to collect and store images on our
          servers.
        </p>
        <h2 className="text-xl font-bold mb-2">Information We Collect</h2>
        <p className="mb-4">
          When you use the App, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. We refer to this automatically-collected information as
          &quot;Device Information&quot;.
        </p>
        <p className="mb-4">
          We collect Device Information using the following technologies:
        </p>
        <ul className="list-disc ml-8 mb-4">
          <li>
            Cookies: Cookies are data files that are placed on your device or
            computer and often include an anonymous unique identifier.
          </li>
          <li>
            Log files: Log files track actions occurring on the App, and collect
            data including your IP address, browser type, Internet service
            provider, referring/exit pages, and date/time stamps.
          </li>
        </ul>
        <p className="mb-4">
          When you upload an image to the App, we collect the image itself. We
          use the image to generate an alt tag and store the alt tag. The image
          is then automatically deleted after 24 hours.
        </p>
        <h2 className="text-xl font-bold mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          We use the images you upload to our servers solely for the purpose of
          generating an alt tag and serving it back to you. We do not use your
          images for any other purpose. To provide this service, we use a
          machine learning algorithm provided by Replicate, Inc. You can read
          more about how Replicate, Inc. uses your data{' '}
          <Link
            className="underline text-blue-400"
            href="https://replicate.com/terms"
          >
            here
          </Link>
          . We require all third-party providers to have adequate technical and
          organizational measures in place to ensure the security of user data.
          We do not share user data with any other third parties.
        </p>
        <h2 className="text-xl font-bold mb-2">
          How We Protect Your Information
        </h2>
        <p className="mb-4">
          We take the security of your information very seriously. All images
          uploaded to our servers are stored in a secure location in Germany. We
          do not share your images with any third parties. We also automatically
          delete all images from our servers after 24 hours.
        </p>
        <h2 className="text-xl font-bold mb-2">Use of Cookies</h2>
        <p className="mb-4">
          We do not use any cookies to track user behavior. We only use session
          cookies to manage your session on our website.
        </p>
        <h2 className="text-xl font-bold mb-2">
          Changes to Our Privacy Policy
        </h2>
        <p className="mb-4">
          We reserve the right to make changes to this Privacy Policy at any
          time. Any changes will be posted on this page, so please check back
          periodically for updates.
        </p>
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at admin@wordful.ai.
        </p>
      </div>
    </div>
  )
}

export default page
