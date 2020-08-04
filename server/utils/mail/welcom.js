const welcome = (name) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      @media screen {
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          src: local('Lato Regular'), local('Lato-Regular'),
            url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
              format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 700;
          src: local('Lato Bold'), local('Lato-Bold'),
            url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
              format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato Italic'), local('Lato-Italic'),
            url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
              format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato Bold Italic'), local('Lato-BoldItalic'),
            url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
              format('woff');
        }
      }

      /* CLIENT-SPECIFIC STYLES */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* RESET STYLES */
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }

      table {
        border-collapse: collapse !important;
      }

      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }

      /* iOS BLUE LINKS */
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* MOBILE STYLES */
      @media screen and (max-width: 600px) {
        h1 {
          font-size: 32px !important;
          line-height: 32px !important;
        }
      }

      /* ANDROID CENTER FIX */
      div[style*='margin: 16px 0;'] {
        margin: 0 !important;
      }
    </style>
  </head>

  <body
    style="
      background-color: #f4f4f4;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <table style="border: 0; width: 100%;">
      <!-- LOGO -->
      <tr>
        <td
          style="
            background: #fd746c; /* fallback for old browsers */
            background: -webkit-linear-gradient(
              to right,
              #ff9068,
              #fd746c
            ); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(
              to right,
              #ff9068,
              #fd746c
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          "
        >
          <table style="border: 0; width: 100%; max-width: 600px;">
            <tr>
              <td
                style="
                  text-align: center;
                  vertical-align: top;
                  padding: 40px 10px 40px 10px;
                "
              ></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td
          style="
            background: #fd746c; /* fallback for old browsers */
            background: -webkit-linear-gradient(
              to right,
              #ff9068,
              #fd746c
            ); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(
              to right,
              #ff9068,
              #fd746c
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

            text-align: center;
            padding: 0px 10px 0px 10px;
          "
        >
          <table
            style="border: 0; width: 100%; max-width: 600px; margin: auto;"
          >
            <tr>
              <td
                style="
                  background-color: #fff;
                  text-align: center;
                  vertical-align: top;
                  padding: 40px 20px 20px 20px;
                  color: #111111;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 4px;
                  line-height: 48px;
                  border-radius: 20px 20px 0 0;
                "
              >
                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">
                  Welcome ${name}
                </h1>
                <img
                  src=" https://img.icons8.com/clouds/100/000000/handshake.png"
                  width="125"
                  height="120"
                  style="display: block; border: 0px; margin: auto;"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td
          style="
            background-color: #f4f4f4;
            text-align: center;
            padding: 0px 10px 0px 10px;
          "
        >
          <table
            style="border: 0; width: 100%; max-width: 600px; margin: auto;"
          >
            <tr>
              <td
                style="
                  background: linear-gradient(to top, #e0e0e0 14%, #fff);
                  text-align: left;
                  padding: 20px 30px 40px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                  border-radius: 0 0 20px 20px;
                "
              >
                <p style="margin: 0;">
                  We're excited to have you get started. Hope you enjoy our
                  site.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

module.exports = welcome;
