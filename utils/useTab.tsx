
import Chat from "@/components/chat"
import Dashboard from "@/components/Dashboard"
import Gallery from "@/components/Instagram/gallery"
import Home from "@/components/Instagram/home"
import Profile from "@/components/Instagram/profile"
import Setting from "@/components/Instagram/setting"
import Settings from "@/components/ui/settings"
import Logout from "@/components/Logout"
import Tools from "@/components/Tools"
import Test from "@/components/ui/testUser"
import Upload from "@/components/Upload"

export const dataStategy = {
   Dashboard: <Dashboard />,
   Tools: <Tools />,
   Upload: <Upload />,
   Chat: <Chat />,
   Setting: <Settings />,
   Logout: <Logout />,

}

export type Tabkey = keyof typeof dataStategy


export const instagramStrategy = {
   home: <Home />,
   profile: <Profile />,
   setting: <Setting />,
   gallery: <Gallery />,

}

export type InstagramKey = keyof typeof instagramStrategy