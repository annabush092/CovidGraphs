class GraphsController < ApplicationController
    def index 
        @date = Time.now.utc.strftime("%FT%T")
    end
end
