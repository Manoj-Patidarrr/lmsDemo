//jshint esversion:11

export function baseTemplate(user, message) {
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
<div style="background:#ECECEC; padding:30px;font-family: 'Roboto Slab', serif;"
     >
  <div style="height: 100px; padding: 10px;
              display:flex; align-items:center; justify-content:center;
" >
    <img src="https://shethink.in/wp-content/uploads/2021/07/Favicon-Shethink.png" width=100 height=100
         alt="shethink image">
  </div>
  <div style="background:#FFF;border-radius:10px 10px; padding: 5px;
              ">
               Hi ${user},  
               <br> 
               ${message}
                <br>
               Thanks,<br>
               Shethink
              </div>
  <div style="background:#EFEFEF;height: 10px;
              padding:10px;
              border-radius:0 0 10px 10px">
    @copyright©2022 by shethink.in
  </div>
</div>`;
}
