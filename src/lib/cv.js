import * as Papa from "papaparse";

const cv_url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQRMS1vyf6xcxPBBE0j7_inglkQVo7EFodBxWRNM1BI6PLATEk3jjO25Enjkde4hqAcZvd8tu9LGrvL/pub?output=csv";

const getPhoneInfo = (url) => {
  let data = [];
  return new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        data = results.data;
        // console.log(data);
        resolve(data);
      },
    });
  });
};

export const phoneInfo = getPhoneInfo(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTUmLReoqswu9GCYQUbf7M-ZqgogFjFOgNhXJ7NirfCJtUEeapK61QqA6DqVt-Htowe1WMXQFBerLdQ/pub?gid=1263643295&single=true&output=csv"
);

export const secondWeek = getPhoneInfo(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTUmLReoqswu9GCYQUbf7M-ZqgogFjFOgNhXJ7NirfCJtUEeapK61QqA6DqVt-Htowe1WMXQFBerLdQ/pub?gid=1315684062&single=true&output=csv"
);
