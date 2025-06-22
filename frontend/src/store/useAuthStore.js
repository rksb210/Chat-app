import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URl = "http://localhost:5001"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggin: false,
  isUpdatingProfile: false,
   onlineUsers: [],
   socket:null,


  checkingAuth: async () => {
    try {
      const res = axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
      console.log("error in checkingAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) =>{
   try {
      set({isSigningUp :true})
      const res =await axiosInstance.post('/auth/signup',data)
      set({authUser:res.data})
      toast.success("Account created suucessfully")
      get().connectSocket()
   } catch (error) {
      console.log("error in checkingAuth", error);
      // toast.error(error.response.data.message)          
   }finally{
      set({isSigningUp :false})
   }
  },

    login: async (data) =>{
   try {
      set({isLoggin :true})
      const res =await axiosInstance.post('/auth/login',data)
      set({authUser:res.data})
      toast.success("Login suucessfully")
      get().connectSocket()
   } catch (error) {
      console.log("error in checkingAuth", error);
      toast.error("Error in login")          
   }finally{
      set({isLoggin :false})
   }
  },

  logout : async () => {
   try {
   
      await axiosInstance.post('/auth/logout')
      set({authUser:null})
      toast.success("Logout suucessfully")
      get().disConnectSocket()
   } catch (error) {
      console.log("error in logout", error);
      toast.error("Faild in logout")          
   }
  },

  updateProfile: async (data) =>{
   try {
      set({isUpdatingProfile :true})
      const res =await axiosInstance.put('/auth/update-profile',data)
      set({authUser:res.data})
      toast.success("Account created suucessfully")
   } catch (error) {
      console.log("error in checkingAuth", error);
      // toast.error(error.response.data.message)          
   }finally{
      set({isUpdatingProfile :false})
   }
  },

  connectSocket : () => {
   const {authUser} = get()
   if(!authUser || get().socket?.connected) return;

   // when socket connects, means it has userId so on connection userid send to backend through query for which we can find online users
   const socket = io(BASE_URl,{
      query:{
         userId:authUser._id
      }
   })
   socket.connect()

   set({socket:socket})

   socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers: userIds})
   })
  },
  disConnectSocket : () => {
    if (get().socket?.connected) get().socket.disconnect();
  }

}));
