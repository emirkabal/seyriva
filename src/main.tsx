import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import "@/i18n"

import { Home } from "./views/Home.tsx"
import { Watch } from "./views/Watch.tsx"
import { Browse } from "./views/Browse.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/browse/:category" element={<Browse />} />
          <Route path="/w/:type/:id" element={<Watch />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
