import MainLayout from "./Mainlayout"
export default function Page({children}) {
    return(
        <MainLayout>
            {children}
        </MainLayout>
    )
}