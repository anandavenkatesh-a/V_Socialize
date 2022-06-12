

{   
    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#send_post');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-container').prepend(newPost);

                    let deleteLink = $(' .delete',newPost)
                    deleteLink.click(deleteReq);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li class = "post" id="post-${post._id}"> 

        <a href="/post/destroy/${post._id}" class = 'delete'>X</a>

        <p class = "message"> ${ post.data } </p> 

        <span class = "message_author"> ${post.user.email} </span> 
        
          <form action = '/comment/create/?post_id=${post._id}' class = "send_comment" method="post">
            <textarea name="data" cols="30" rows="3" placeholder = "Type your comments here...."></textarea>
            <br>
            <button type="submit">Comment</button>
          </form>

        <ul class = "comments-container" id="post-comments-${ post._id }">
              
        </ul>
     </li>
 `);        
    }


    function deleteReq(e)
    {
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(this).prop('href'),
            success:(post_id) => {
                $(`#post-${post_id.data}`).remove();
            },error:(err) => {
                console.log(err.responseText);
            }
        });
    }

    createPost();

}



