import localFont from "next/font/local";
import { Montserrat_Alternates } from 'next/font/google'



export const GeistSans = localFont({
    src: "../app/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
export const GeistMono = localFont({
    src: "../app/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
export const titleFont = Montserrat_Alternates({
    subsets: ['latin'],
    weight: ['500', '700']
})