import React from "react";

const sections = [
  {
    title: "1. Overview",
    content: (
      <>
        <p>
          Agent Workflow is an automation platform developed by Forgetz Studio
          that helps users manage social media, email, GitHub, and WhatsApp
          workflows from one workspace.
        </p>
        <p>
          The platform connects to third-party services only when the user
          chooses to connect and authorize them.
        </p>
      </>
    ),
  },
  {
    title: "2. Services & Integrations",
    content: (
      <>
        <p>Agent Workflow may provide automation for:</p>
        <ul>
          <li>Multi-platform social media posting</li>
          <li>Gmail automation</li>
          <li>GitHub automation</li>
          <li>WhatsApp automation</li>
        </ul>
        <p>
          Available integrations may change as the platform develops. Users
          control which services they connect to Agent Workflow.
        </p>
      </>
    ),
  },
  {
    title: "3. Information We Collect",
    content: (
      <>
        <p>
          Depending on the integrations used, Agent Workflow may process:
        </p>
        <ul>
          <li>Basic account information</li>
          <li>OAuth access tokens and refresh tokens</li>
          <li>Social media account identifiers</li>
          <li>Email metadata and messages required by enabled workflows</li>
          <li>GitHub repositories and related data required by enabled workflows</li>
          <li>WhatsApp account and message data required by enabled workflows</li>
          <li>Content created or uploaded by the user</li>
          <li>Workflow configuration and automation settings</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. How We Use Information",
    content: (
      <>
        <p>Information is used to provide features requested by the user, including:</p>
        <ul>
          <li>Publishing content to connected social media platforms</li>
          <li>Creating and managing email workflows</li>
          <li>Automating GitHub-related tasks</li>
          <li>Processing WhatsApp automation workflows</li>
          <li>Executing scheduled workflows</li>
          <li>Maintaining authentication and account connections</li>
          <li>Improving reliability and security of the platform</li>
        </ul>
        <p>
          We do not use connected account data for purposes unrelated to the
          functionality requested by the user.
        </p>
      </>
    ),
  },
  {
    title: "5. Third-Party Services",
    content: (
      <>
        <p>
          Agent Workflow may connect with third-party platforms such as social
          media providers, Google, GitHub, and Meta/WhatsApp services.
        </p>
        <p>
          Each third-party service may have its own privacy policy and terms.
          Users should review those policies when connecting an account.
        </p>
      </>
    ),
  },
  {
    title: "6. OAuth & Account Access",
    content: (
      <>
        <p>
          Agent Workflow uses OAuth authorization when supported by a connected
          platform.
        </p>
        <p>
          Users must explicitly authorize the permissions requested by each
          integration. Agent Workflow only requests access required for the
          enabled functionality.
        </p>
        <p>
          Users can disconnect an integration from the application when the
          feature is available. Revoking authorization through the connected
          third-party service may also prevent future access.
        </p>
      </>
    ),
  },
  {
    title: "7. Data Security",
    content: (
      <>
        <p>
          We use reasonable technical and organizational measures to protect
          account information, authentication credentials, and connected
          service data.
        </p>
        <p>
          Access tokens and integration credentials are intended to be handled
          securely and are only used to perform actions authorized by the user.
        </p>
      </>
    ),
  },
  {
    title: "8. Data Retention",
    content: (
      <>
        <p>
          We retain information only for as long as reasonably necessary to
          provide the requested services, maintain account functionality, or
          comply with applicable legal requirements.
        </p>
        <p>
          Users may request deletion of their account and associated data,
          subject to information that we may be legally required to retain.
        </p>
      </>
    ),
  },
  {
    title: "9. User Control",
    content: (
      <>
        <p>Users can control their connected services by:</p>
        <ul>
          <li>Connecting or disconnecting supported integrations</li>
          <li>Managing automation workflows</li>
          <li>Removing scheduled or automated actions</li>
          <li>Revoking OAuth authorization through supported providers</li>
          <li>Requesting deletion of their account and data</li>
        </ul>
      </>
    ),
  },
  {
    title: "10. Policy Updates",
    content: (
      <p>
        This policy may be updated when Agent Workflow introduces new
        functionality, integrations, or changes to its data practices. The
        latest version will always be published on this page.
      </p>
    ),
  },
  {
    title: "11. Contact",
    content: (
      <>
        <p>
          If you have questions about this policy or want to request deletion
          of your account or data, please contact:
        </p>
        <p className="font-semibold">support@forgetzstudio.com</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#e6e7eb] px-4 py-10 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#e6e7eb] shadow-[8px_8px_16px_#c5c6ca,-8px_-8px_16px_#ffffff]">
            <span className="text-2xl font-bold text-slate-700">AW</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Agent Workflow helps you automate social media, email, GitHub,
            and WhatsApp workflows from one workspace.
          </p>

          <div className="mx-auto mt-6 inline-flex rounded-full bg-[#e6e7eb] px-5 py-2 text-xs font-medium text-slate-500 shadow-[inset_3px_3px_7px_#c5c6ca,inset_-3px_-3px_7px_#ffffff]">
            Last updated: September 27, 2026
          </div>
        </header>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[28px] bg-[#e6e7eb] p-6 shadow-[10px_10px_20px_#c5c6ca,-10px_-10px_20px_#ffffff] sm:p-8"
            >
              <h2 className="mb-5 text-xl font-bold text-slate-800">
                {section.title}
              </h2>

              <div className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center">
          <div className="inline-flex rounded-2xl bg-[#e6e7eb] px-6 py-4 text-sm text-slate-500 shadow-[inset_4px_4px_8px_#c5c6ca,inset_-4px_-4px_8px_#ffffff]">
            © {new Date().getFullYear()} Forgetz Studio. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}