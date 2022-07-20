{let e=function(){let t=$("#send_post");t.submit(function(e){e.preventDefault(),$.ajax({type:"post",url:"/post/create",data:t.serialize(),success:function(e){e=s(e.data.post);$("#posts-container").prepend(e);let t=$(" .delete",e);t.click(deleteReq)},error:function(e){console.log(e.responseText)}})})},s=function(e){return $(`<li class = "post" id="post-${e._id}"> 

        <a href="/post/destroy/${e._id}" class = 'delete'>X</a>

        <p class = "message"> ${e.data} </p> 

        <span class = "message_author"> ${e.user.email} </span> 
        
          <form action = '/comment/create/?post_id=${e._id}' class = "send_comment" method="post">
            <textarea name="data" cols="30" rows="3" placeholder = "Type your comments here...."></textarea>
            <br>
            <button type="submit">Comment</button>
          </form>

        <ul class = "comments-container" id="post-comments-${e._id}">
              
        </ul>
     </li>
 `)};function deleteReq(e){e.preventDefault(),$.ajax({type:"get",url:$(this).prop("href"),success:e=>{$("#post-"+e.data).remove()},error:e=>{console.log(e.responseText)}})}e()}