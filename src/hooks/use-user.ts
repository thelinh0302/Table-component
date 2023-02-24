import { useQuery } from '@tanstack/react-query';
import { getUsersList } from '@/apis/user';

const useUserList = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([], async () => {
    const resp = await getUsersList();
    console.log(resp.data);
    const respData = resp.data.map((item: any) => {
      return { id: item.id, username: item.username, email: item.email };
    });
    return respData;
  });
};
export default useUserList;
