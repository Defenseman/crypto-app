import { Layout, Spin } from "antd"
import AppContent from "./AppContent"
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import AppSider from "./AppSider"
import { useContext } from "react"
import CryptoContex from "../../context/CryptoContext"

export const AppLayout = () => {
    const { isLoading } = useContext(CryptoContex)
    if (isLoading) {
        return <Spin fullscreen/>
    }
    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSider />
                <AppContent />
            </Layout>
            <AppFooter />
      </Layout>
    )
}