import toast from "react-hot-toast"
import CustomToast from "@/components/CustomToast"
import React from "react"

export const showToast = (type: "success" | "error" | "info", message: string) => {
  toast.custom((t) => (
    <div className={`${t.visible ? "animate-enter" : "animate-leave"}`}>
      <CustomToast type={type} message={message} />
    </div>
  ))
}
