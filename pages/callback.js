import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import CopyToClipboard from "react-copy-to-clipboard";

/*
    Generate spotify code :
https://accounts.spotify.com/authorize?client_id=87b2bc9f62d7400297d151a69e656529&response_type=code&redirect_uri=http%3A%2F%2Flocalhost:3000%2Fcallback

    Generate refresh token :
curl -H "Authorization: Basic ODdiMmJjOWY2MmQ3NDAwMjk3ZDE1MWE2OWU2NTY1Mjk6NzdmOWQ4OTBhNmE0NDcyYTlmZjk1ZWFlMmEyNmU5NGE=" -d grant_type=authorization_code -d code=AQB6_lVEJRBHV7PW5efJXIQoVzAqlbG728H2-ZpqfC8d_7GUB2h3fZ0Z4HrQQXlrPhodg-hZF1knNGj9t4c2J2KR1ITFW-6O-yGMG4_-OT-y1WVPcJ7Ct8E8t6kdp0iERPIoHz58JTGYscac8A0oyXigsuLhDPBEI3C5tZQBUnOYvQ -d redirect_uri=http%3A%2F%2Flocalhost:3000%2Fcallback https://accounts.spotify.com/api/token

    Refresh token : 
AQCLqWYF2Oykwqg2Z-9ueHgK9rT-WNjbnbmCG4N0djG-GCklQU22mlevgfJ3SoaWGSga0gKcnRe2-FnXsAhKZxNdao5RdEYa23Ykmsiw87v_Bbt5wukV41EGbPp4fSi5Vho
*/
export default function Callback() {
  const { query } = useRouter();
  return (
    <div className="w-full">
      <div className="bg-white w-5/6 mx-auto mt-20">
        <div className="justify-center items-center shadow p-6 flex flex-col">
          <h4 className="mt-8 border-b-2 font-bold">Spotify code</h4>
          <div className="mb-10 text-center capitalize">
            {query.code && (
              <div className="flex">
                <p className="inline-block">{query.code}</p>
                <CopyToClipboard text={query.code} className="inline-block btn w-20" >
                  <ClipboardCopyIcon />
                </CopyToClipboard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const spotifyUrl = "https://accounts.spotify.com/api/token";
const spotifyParams = {
  grant_type: "authorization_code",
  headers: {
    Authorization:
      "Basic ODdiMmJjOWY2MmQ3NDAwMjk3ZDE1MWE2OWU2NTY1Mjk6NzdmOWQ4OTBhNmE0NDcyYTlmZjk1ZWFlMmEyNmU5NGE=",
  },
  data: {
    code: "AQAkiQIDJRbS2JAIO_8QRPak1faC_NsAkfBb143268-PY9dHSbzp80OWIP3GQD8WVay3DQHCIRuloKSXcqBtXjH38aPVRNg5fxgpqsIyXJJcF_3yzS-SuMF7Xb6oY1J6mGfY7fv6KvgAMEbqZT36I2_4EsWRQed5Pp43ngSYq_HUSg",
    redirect_uri: "http://localhost:3000/callback",
  },
};
