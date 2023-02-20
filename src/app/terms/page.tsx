import { FC } from "react"
import Head from "next/head"

const page: FC = () => {
  return (
    <div className="text-slate-300">
      <Head>
        <title>ImageToAlt - Terms and Conditions</title>
      </Head>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">
          ImageToAlt Terms and Conditions
        </h1>
        <p className="mb-4">
          These terms and conditions ("Terms") apply to your use of the
          ImageToAlt app ("App") and the alt tag generation service ("Service")
          provided by ImageToAlt ("we" or "us"). By using the App or the
          Service, you agree to be bound by these Terms.
        </p>
        <h2 className="text-xl font-bold mb-2">
          Use of the App and the Service
        </h2>
        <p className="mb-4">
          The App and the Service are provided for informational purposes only.
          You may use the App and the Service at your own risk, and we shall not
          be liable for any damages or harm that may arise from your use of the
          App or the Service.
        </p>
        <h2 className="text-xl font-bold mb-2">Intellectual Property</h2>
        <p className="mb-4">
          The App and the Service, including any content or materials made
          available through the App or the Service, are protected by copyright
          and other intellectual property laws. You may not copy, modify,
          distribute, sell, or lease any part of the App or the Service without
          our prior written consent.
        </p>
        <h2 className="text-xl font-bold mb-2">Disclaimer of Liability</h2>
        <p className="mb-4">
          The App and the Service are provided "as is" and without warranty of
          any kind. We make no representations or warranties of any kind,
          express or implied, about the completeness, accuracy, reliability,
          suitability or availability with respect to the App or the Service or
          the information, products, services, or related graphics contained in
          the App or the Service for any purpose. To the fullest extent
          permitted by law, we disclaim any and all warranties, express or
          implied, including, but not limited to, implied warranties of
          merchantability and fitness for a particular purpose.
        </p>
        <p className="mb-4">
          In no event shall ImageToAlt be liable for any direct, indirect,
          incidental, consequential, special or exemplary damages, including,
          but not limited to, damages for loss of profits, goodwill, use, data
          or other intangible losses resulting from the use of or inability to
          use the App or the Service.
        </p>
        <h2 className="text-xl font-bold mb-2">Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify and hold ImageToAlt, its affiliates, officers,
          agents, and other partners and employees, harmless from any loss,
          liability, claim or demand, including reasonable attorneys' fees, made
          by any third party due to or arising out of your use of the App or the
          Service.
        </p>
        <h2 className="text-xl font-bold mb-2">Termination</h2>
        <p className="mb-4">
          We may terminate your access to the App and the Service at any time,
          without cause or notice.
        </p>
        <h2 className="text-xl font-bold mb-2">Governing Law</h2>
        <p className="mb-4">
          These Terms and your use of the App and the Service shall be governed
          by and construed in accordance with the laws of Germany, without
          giving effect to any principles of conflicts of law.
        </p>
        <h2 className="text-xl font-bold mb-2">Changes to these Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms at any time. If we make
          changes to these Terms, we will post the revised Terms on the App and
          update the "Last Updated" date at the top of these Terms. By
          continuing to use the App and the Service after the revised Terms
          become effective, you agree to be bound by the revised Terms.
        </p>
        <h2 className="text-xl font-bold mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms or the App or the Service,
          please contact us at admin@wordful.ai.
        </p>
        <p className="text-sm">Last Updated: Feb 20th, 2023</p>
      </div>
    </div>
  )
}

export default page
