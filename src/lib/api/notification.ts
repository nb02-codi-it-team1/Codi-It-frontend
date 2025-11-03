// import { useApiStore } from "@/stores/useApiStore";
import { useUserStore } from "@/stores/userStore";
import { NotificationItem } from "@/types/notification";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getAxiosInstance } from "./axiosInstance";
import { useApiStore } from "@/stores/useApiStore";

// SSE 연결
export const connectNotificationSSE = () => {
  const token = useUserStore.getState().accessToken;
  if (!token) return null;
  
  // const baseURL =
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:3000/api"  // dev 모드에서는 직접 백엔드
  //   : ""; // production에서는 /api rewrite 사용
  // const baseURL = useApiStore.getState().baseURL;
  // console.log("SSE 연결 URL:", `${baseURL}/notifications/sse`);
  // const es = new EventSourcePolyfill(`${baseURL}/notifications/sse`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   withCredentials: false, // Authorization 헤더 충돌 방지
  // });

  const baseURL = useApiStore.getState().baseURL;
  
  // 💡 1. 토큰을 URL 인코딩합니다.
  const encodedToken = encodeURIComponent(token);
  
  // 💡 2. URL에 쿼리 스트링으로 토큰을 추가합니다.
 const sseUrl = `${baseURL}/notifications/sse?token=${encodedToken}`; 
 
 console.log("SSE 연결 URL:", sseUrl);
 
 // 💡 3. EventSourcePolyfill 생성 시, 헤더 옵션을 제거합니다.
 const es = new EventSourcePolyfill(sseUrl, {
  withCredentials: false, 
  });
  
  // 메시지 이벤트
  es.addEventListener('message', (e: MessageEvent) => {
    console.log('SSE 메시지:', e.data);
  });

  // 에러 이벤트
  es.addEventListener('error', (e: Event) => {
    console.error('SSE 연결 오류', e);
    // 연결 실패 시 무한 재연결 방지
    es.close();
  });

  return es;
};

// 알림 목록 가져오기
export const getNotifications = async (): Promise<NotificationItem[]> => {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get("/notifications");
  return response.data;
};

// 알림 읽음 처리
export const updateNotificationCheck = async (alarmId: string): Promise<void> => {
  const axiosInstance = getAxiosInstance();
  await axiosInstance.patch(`/notifications/${alarmId}/check`);
};
