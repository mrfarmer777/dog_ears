class ApplicationController < ActionController::Base
    before_action :authorized
    
    def encode_token(payload)
        token=JWT.encode(payload,"flobble")
    end
    
    def auth_header
        header=request.headers['Authorization']
    end
    
    def decoded_token
        if auth_header
            token=auth_header.split(" ")[1]
            begin 
                decoded_token=JWT.decode(token,'flobble',true,{algorithm: "HS256"})
            rescue JWT::DecodeError
                #array with a hash, because thats what the other lines are expecting
                [{}]
            end
        else
        end
    end
    
    def current_user
        if decoded_token
            if user_id=decoded_token[0]["user_id"]
              @user=User.find(user_id)
            else
            end
        else
        end
    end
    
    
    def logged_in?
        !!current_user
    end
    
    def authorized
        redirect_to "/" unless logged_in?
    end
end
