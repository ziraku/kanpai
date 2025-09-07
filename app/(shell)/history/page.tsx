import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoryPage() {
  const mockHistory = {
    today: 5,
    yesterday: 8,
    thisWeek: 23,
    thisMonth: 67,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">履歴</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">今日</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockHistory.today}</p>
              <p className="text-xs text-gray-500">杯</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">昨日</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockHistory.yesterday}</p>
              <p className="text-xs text-gray-500">杯</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">今週</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockHistory.thisWeek}</p>
              <p className="text-xs text-gray-500">杯</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">今月</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{mockHistory.thisMonth}</p>
              <p className="text-xs text-gray-500">杯</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-100 border-dashed">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500 text-sm">
              📊 グラフ機能は準備中です
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}