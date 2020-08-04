require('dotenv').config();

const ResetPassword = (data) => {
  const URL =
    process.env.NODE_ENV === 'production'
      ? process.env.ROOT_URL
      : 'http://localhost:3000';

  return `
  <!doctype html>
  <html>
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset Your Waves Password</title>
    <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
    
    <style type="text/css">
      @media only screen and (min-width:768px){
            .templateContainer{
                width:600px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            body,table,td,p,a,li,blockquote{
                -webkit-text-size-adjust:none !important;
            }
  
    }   @media only screen and (max-width: 480px){
            body{
                width:100% !important;
                min-width:100% !important;
            }
  
    }   @media only screen and (max-width: 480px){
            #bodyCell{
                padding-top:10px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnImage{
                width:100% !important;
            }
  
    }   @media only screen and (max-width: 480px){
  
     .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                max-width:100% !important;
                width:100% !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnBoxedTextContentContainer{
                min-width:100% !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnImageGroupContent{
                padding:9px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnCaptionLeftContentOuter
     .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                padding-top:9px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnImageCardTopImageContent,.mcnCaptionBlockInner
     .mcnCaptionTopContent:last-child .mcnTextContent{
                padding-top:18px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnImageCardBottomImageContent{
                padding-bottom:9px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnImageGroupBlockInner{
                padding-top:0 !important;
                padding-bottom:0 !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnImageGroupBlockOuter{
                padding-top:9px !important;
                padding-bottom:9px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnTextContent,.mcnBoxedTextContentColumn{
                padding-right:18px !important;
                padding-left:18px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                padding-right:18px !important;
                padding-bottom:0 !important;
                padding-left:18px !important;
            }
  
    }   @media only screen and (max-width: 480px){
            .mcpreview-image-uploader{
                display:none !important;
                width:100% !important;
            }
  
    }   @media only screen and (max-width: 480px){
        /*
        @tab Mobile Styles
        @section Heading 1
        @tip Make the first-level headings larger in size for better readability
     on small screens.
        */
            h1{
                /*@editable*/font-size:20px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
        /*
        @tab Mobile Styles
        @section Heading 2
        @tip Make the second-level headings larger in size for better
     readability on small screens.
        */
            h2{
                /*@editable*/font-size:20px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
        /*
        @tab Mobile Styles
        @section Heading 3
        @tip Make the third-level headings larger in size for better readability
     on small screens.
        */
            h3{
                /*@editable*/font-size:18px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
        /*
        @tab Mobile Styles
        @section Heading 4
        @tip Make the fourth-level headings larger in size for better
     readability on small screens.
        */
            h4{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
        /*
        @tab Mobile Styles
        @section Boxed Text
        @tip Make the boxed text larger in size for better readability on small
     screens. We recommend a font size of at least 16px.
        */
            .mcnBoxedTextContentContainer
     .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
        /*
        @tab Mobile Styles
        @section Preheader Visibility
        @tip Set the visibility of the email's preheader on small screens. You
     can hide it to save space.
        */
            #templatePreheader{
                /*@editable*/display:block !important;
            }
  
    }   @media only screen and (max-width: 480px){
        /*
        @tab Mobile Styles
        @section Preheader Text
        @tip Make the preheader text larger in size for better readability on
     small screens.
        */
            #templatePreheader .mcnTextContent,#templatePreheader
     .mcnTextContent p{
                /*@editable*/font-size:12px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
            #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
            #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                /*@editable*/font-size:16px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }   @media only screen and (max-width: 480px){
            #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                /*@editable*/font-size:12px !important;
                /*@editable*/line-height:150% !important;
            }
  
    }
    </style>
  </head>
  
  <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   background-color: #c1eb62; height: 100%; margin: 0; padding: 0; width: 100%">
    <center>
      <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
   100%; height: 100%; margin: 0; padding: 0; width:
   100%" width="100%">
        <tr>
          <td align="center" id="bodyCell" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
   height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
            <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse;-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
   600px; border: 0" width="100%">
              <tr>
                <td id="templatePreheader" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f8a264;
   border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   min-width:100%;" width="100%">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td class="mcnTextBlockInner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse;-ms-text-size-adjust: 100%; -webkit-text-size-adjust:
   100%; min-width:100%;" width="100%">
                            <tbody>
                              <tr>
                                <td class="mcnTextContent" style='
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
   color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px;
   line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
   padding-bottom: 9px; padding-left: 18px;' valign="top">
                                  <span href="https://www.mbopartners.com" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
   font-weight: normal; text-decoration: none" target="_blank" title="MBO Partners makes it safer and easier for independent consultants and their clients to do business together.">
                                    <h1 style="font-size: 42px; margin-bottom: 10px; text-align: center;">waves</h1>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td id="templateHeader" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff;
   border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse;-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   min-width:100%;" width="100%">
                    <tbody class="mcnImageBlockOuter">
                      <tr>
                        <td class="mcnImageBlockInner" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
   100%; min-width:100%;" width="100%">
                            <tbody>
                              <tr>
                                <td class="mcnImageContent" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
   padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                  <span class="" href="https://www.mbopartners.com" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
   #f84b4b; font-weight: normal; text-decoration: none" target="_blank" title="">
                                    <span class="" href="https://www.mbopartners.com/" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
   #f84b4b; font-weight: normal; text-decoration: none" target="_blank" title="">
                                      <img align="center" alt="Forgot your password?" class="mcnImage" src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png" style="-ms-interpolation-mode: bicubic; border: 0;outline: none;
   text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
   0; display: inline !important; vertical-align: bottom;" width="600"></img>
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td id="templateBody" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #ffffff;
   border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td class="mcnTextBlockInner" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
   100%; min-width:100%;" width="100%">
                            <tbody>
                              <tr>
                                <td class="mcnTextContent" style='
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
   color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
   line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
   padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                  <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
   sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
   125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
   padding: 0'><span style="text-transform:uppercase">Forgot</span></h1>
  
  
                                  <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
   sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
   125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
   padding: 0'><span style="text-transform:uppercase">your password?</span></h2>
  
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   min-width:100%;" width="100%">
                    <tbody class="mcnTextBlockOuter">
                      <tr>
                        <td class="mcnTextBlockInner" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
   100%; min-width:100%;" width="100%">
                            <tbody>
                              <tr>
                                <td class="mcnTextContent" style='
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
   color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
   line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
   padding-bottom: 9px; padding-left: 18px;' valign="top">Not to worry, we got you! Let’s get you a new password.
                                  <br></br>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   min-width:100%;" width="100%">
                    <tbody class="mcnButtonBlockOuter">
                      <tr>
                        <td align="center" class="mcnButtonBlockInner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse;
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                            <tbody class="mcnButtonBlockOuter">
                              <tr>
                                <td align="center" class="mcnButtonBlockInner" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                  <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse;  -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   border-collapse: separate !important;border-radius: 48px;background-color:
   #f84b4b;">
                                    <tbody>
                                      <tr>
                                        <td align="center" class="mcnButtonContent" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
   font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
   padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
   <a href="${URL}/reset_password/${data.resetToken}" class="mcnButton "style="mso-line-height-rule: exactly;
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #f84b4b;
   font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
   1px;line-height: 100%;text-align: center;text-decoration: none;color:
   #FFFFFF; text-transform:uppercase;" title="Reset your waves password">Reset password</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse;
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                    <tbody class="mcnImageBlockOuter">
                      <tr>
                        <td class="mcnImageBlockInner" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                          <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse;  -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
   100%; min-width:100%;" width="100%">
                            <tbody>
                              <tr>
                                <td class="mcnImageContent" style="
   -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
   padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
  
  </html>
  
    `;
};

module.exports = ResetPassword;
