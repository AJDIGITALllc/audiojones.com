import mappings from "@/config/automation-mappings.json";

export default function AutomationPage() {
  return (
    <main className="max-w-5xl mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Automation Integrations</h1>
        <p className="text-gray-600 mt-2">
          Expected environment variables: WHOP_API_KEY, MAILERLITE_TOKEN, MAILERLITE_WEBHOOK_SECRET
        </p>
      </div>

      {/* Current Mappings Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Mappings</h2>
        <div className="space-y-4">
          {mappings.map((mapping, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Whop Product ID</span>
                  <div className="mt-1 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {mapping.whopProductId}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">MailerLite Tag</span>
                  <div className="mt-1 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {mapping.mailerliteTag}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">EPM Stage</span>
                  <div className="mt-1 font-semibold text-sm text-orange-600 capitalize">
                    {mapping.epmStage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Endpoints</h2>
        <p className="text-gray-600 mb-4">
          These are POST-only endpoints for testing webhook integration:
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-mono text-sm">/api/integrations/whop</span>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">POST</span>
            </div>
            <span className="text-gray-500 text-sm">Whop webhook receiver</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-mono text-sm">/api/integrations/mailerlite</span>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">POST</span>
            </div>
            <span className="text-gray-500 text-sm">MailerLite webhook receiver</span>
          </div>
        </div>
      </div>
    </main>
  );
}