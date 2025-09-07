"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Bell, Eye } from "lucide-react"

export default function SettingsPage() {
  const handleResetData = () => {
    if (confirm("すべてのデータを削除しますか？この操作は取り消せません。")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">設定</h1>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="w-5 h-5" />
                酔い加減の公開設定
              </CardTitle>
              <CardDescription>
                他のメンバーに酔い加減を表示するかどうか
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm">常に非公開（後日実装）</span>
                <Button variant="outline" size="sm" disabled>
                  変更
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5" />
                通知設定
              </CardTitle>
              <CardDescription>
                指定した杯数でお知らせを表示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm">通知なし（後日実装）</span>
                <Button variant="outline" size="sm" disabled>
                  設定
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-600">
                <Trash2 className="w-5 h-5" />
                データ削除
              </CardTitle>
              <CardDescription>
                すべての記録データを削除します
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleResetData}
              >
                すべてのデータを削除
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Cheers v0.1.0</p>
          <p>© 2025 Cheers App</p>
        </div>
      </div>
    </div>
  )
}