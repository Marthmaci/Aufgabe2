     var firstname =  queryData.fn;
     var lastname =  queryData.ln;
 
-   if(request.method=='GET') 
+    var headers = request.headers;
+    var authorization = headers['authorization'];
+   
+    var username = null;
+    var password = null;
+
+    if (authorization)
+    {
+        var tmp = authorization.split(' ');     // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
+        var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
+        var plain_auth = buf.toString();        // read it back out as a string At this point plain_auth = "username:password"
+
+        var creds = plain_auth.split(':');      // split on a ':'
+        username = creds[0];
+        password = creds[1];
+    }
+
+   if(request.method=='POST') 
    {
-       if (firstname && lastname)
-       {
-           response.end('Hello '+firstname+' '+lastname+'. This was an awesome request with query arguments!');
-       }
-       else
-        response.end('This was an awesome request, but unfortunately there are some missing query arguments'); 
-   } else
+        var body = [];
+        request.on('data', function(chunk) {
+            body.push(chunk);
+        }).on('end', function() {
+            body = Buffer.concat(body).toString();
+                // at this point, `body` has the entire request body stored in it as a string
+                var responseMessage = 'Your provided e-mail address is: '+body;
+                
+                if (authorization) 
+                    responseMessage += '\nYour provided Authorization header is: '+authorization;
+                
+                if (username)
+                    responseMessage += '\nYour provided username is: '+username;
+
+                if (password)
+                    responseMessage += '\nYour provided password is: '+password;
+                
+                response.end(responseMessage);
+       
+            });       
+    }
+    else
    {       
-        response.end('Wow, this was an awesome '+request.method+' request. But you were requestesd to make a GET request with query arguments!\n'); 
+        response.end('Wow, this was an awesome '+request.method+' request. But you were requestesd to make a POST request.!\n'); 
    }
-   
+    
 }).listen(process.env.PORT);
