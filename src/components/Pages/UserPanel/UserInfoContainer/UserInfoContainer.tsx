
import { useQueryClient } from "@tanstack/react-query";
import { useUserTests } from "../../../../hooks/useUserTests";
import { getTests } from "../../../../utils/APIcalls";
import CircularProgress from "@mui/material/CircularProgress";

export default function UserInfoContainer() {
const queryClient=useQueryClient()
    const { isLoading, tests, cachedUserInfo }=useUserTests()
    //prefetching
    queryClient.prefetchQuery({
        queryKey:['tests',cachedUserInfo?.userName],
        queryFn:()=>getTests(cachedUserInfo?.userName??'')
    })
    //   const [cachedUserInfo] = useState<LoginParams | undefined>(
    // queryClient.getQueryData(["user"]))
    //     const handleVerify=async()=>{
    //       await verifyToken(cachedUserInfo?.userName??'')
    //     }
  return (
    <div>
      <p >{`sup user ${cachedUserInfo?.userName}`}</p>
      <p >{`Your Tests`}</p>
      {isLoading?<CircularProgress />:!tests?<p>you have no tests</p>:tests.map((test,index)=><p>{`${index+1}: ${test.title.titleText}, number of questions: ${test.questions.length}`}</p>)}
    </div>
  )
}
