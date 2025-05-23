import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-pink-100 overflow-hidden">
      {/* Квадратики из global.css */}
      <div className="bgSquares">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="square"></div>
        ))}
      </div>

      <Tabs defaultValue="account" className="relative z-10 w-[800px] h-[700px] flex justify-between">
        <TabsContent value="account" >
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-center font-bold text-4xl">
                Регистрация
                </CardTitle>
              <CardDescription className="text-center">
               Создайте учетную запись, чтобы получить доступ ко всем функциям
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1  w-full ">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="" />
              </div>
               <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" defaultValue="" />
              </div>
                <div >
                <Label htmlFor="password">Повтор пароля</Label>
                <Input id="password" defaultValue="" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button  className="bg-pink-600" >Зарегистрироватся</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
