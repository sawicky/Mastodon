function bookingConfirmation(firstName, availability) {

  
    let template = //html
    
    
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
    <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Confirmation of your UTS Medical Appointment</title>
    
    
    <style type="text/css">
    img {
    max-width: 100%;
    }
    body {
    -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
    }
    body {
    background-color: #f6f6f6;
    }
    @media only screen and (max-width: 640px) {
      body {
        padding: 0 !important;
      }
      h1 {
        font-weight: 800 !important; margin: 20px 0 5px !important;
      }
      h2 {
        font-weight: 800 !important; margin: 20px 0 5px !important;
      }
      h3 {
        font-weight: 800 !important; margin: 20px 0 5px !important;
      }
      h4 {padding
        font-weight: 800 !important; margin: 20px 0 5px !important;
      }
      h1 {
        font-size: 22px !important;
      }
      h2 {
        font-size: 18px !important;
      }
      h3 {
        font-size: 16px !important;
      }
      .container {
        padding: 0 !important; width: 100% !important;
      }
      .content {
        padding: 0 !important;
      }
      .content-wrap {
        padding: 10px !important;
      }
      .invoice {
        width: 100% !important;
      }
    }
    .tg  {border-collapse:collapse;border-spacing:0;border-color:#aabcfe;}
      .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#aabcfe;color:#669;background-color:#e8edff;}
      .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#aabcfe;color:#039;background-color:#b9c9fe;}
      .tg .tg-hmp3{background-color:#D2E4FC;text-align:left;vertical-align:top}
      .tg .tg-clb2{font-size:14px;font-family:Arial, Helvetica, sans-serif !important;;background-color:#0f4beb;color:#ffffff;text-align:center;vertical-align:top}
      .tg .tg-lqy6{text-align:right;vertical-align:top}
      .tg .tg-0lax{text-align:left;vertical-align:top}
    </style>
    </head>
    
    <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: "white"; margin: 0;" bgcolor="#f6f6f6">
    
    <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
            <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                                <meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
    <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
      <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
          Hi, ${firstName}
      </td>
     </tr>                               
    
    <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
      <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
            This is just a quick email to confirm your booking with the UTS Medical Appointment System:
      </td>
     
    

     <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">

    </tr>
  </table>
  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
      <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px 20px 20px;" valign="top">
        <table class="tg">
            <tr>
              <th class="tg-clb2" colspan="5">UTS APPOINTMENTS</th>
            </tr>
            <tr>
              <td class="tg-hmp3">Date</td>
              <td class="tg-hmp3">Time</td>
              <td class="tg-hmp3">Doctor</td>
              <td class="tg-hmp3">Location</td>
              <td class="tg-hmp3">ID</td>
            </tr>
            <tr>
              <td class="tg-0lax">${availability.appointment.date}</td>
              <td class="tg-0lax">${availability.appointment.time}</td>
              <td class="tg-lqy6">${availability.doctor}</td>
              <td class="tg-lqy6">Level 6, Building 1 (UTS Tower) - 01.06.001</td>
              <td class="tg-0lax">${availability._id}</td>
            </tr>
          </table>
    </td>
  </tr>
  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
      <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px 0 20px;" valign="top">
            <br>The UTS Medical Team<br>
    
      </td>
     </tr> 
                        </tr></table>
                      <br>
                      <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"> 
                          <tr valign="top">
                              <td style="font-size:10px; font-weight: normal; line-height:15px; padding:10px 30px 0">
                                  <div style="font-weight:bold; line-height:23px">UTS CRICOS Provider Code: 00099F</div>
                                  You have received this email as a UTS student.
                              </td>
                          </tr>
                          <tr valign="top">
                              <td style="font-size:10px; font-weight: normal; line-height:15px; padding:10px 30px 20px">
                                  If you have received this in error please contact
                                  <a href="https://sendstudio.itd.uts.edu.au/sendstudionx/link.php?M=14510390&amp;N=35197&amp;L=25684&amp;F=H" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable">ASK UTS</a>
                              </td>
                          </tr>
                          <tr valign="top">
                              <td style="color:#ffffff; font-family:Helvetica,Arial,sans-serif; font-size:14px; font-weight:normal; line-height:20px; padding:15px
30px" width="600" height="" bgcolor="#0f4Beb">
UNIVERSITY OF TECHNOLOGY SYDNEY</td>
                          </tr>
                      </div>
            </td>
            <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
        </tr></table></body>
        <font face="arial"><font size="1">UTS CRICOS Provider Code: 00099F DISCLAIMER: This email message and any accompanying attachments may contain confidential information. If you are not the intended recipient, do not read, use, disseminate, distribute or copy this message or attachments. If you have received this message in error, please notify the sender immediately and delete this message. Any views expressed in this message are those of the individual sender, except where the sender expressly, and with authority, states them to be the views of the University of Technology Sydney. Before opening any attachments, please check them for viruses and defects. Think. Green. Do. Please consider the environment before printing this email. </font></font>
    </html>`;
    return template;
  }
  module.exports = bookingConfirmation;