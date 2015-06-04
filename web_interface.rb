require "erb"
require 'codebreaker'
require 'json/ext'


class WebInterface
    def call(env)
      @request = Rack::Request.new(env)
      start
      case @request.path
        when "/"
          start true
          main
        when "/compare"
          compare
        when "/hint"
          hint
        when "/secret_code"
          secret_code
        else
          Rack::Response.new("Not Found", 404)
      end
    end

    def start flag =false
      if flag
        @game = Codebreaker::Game.new
      else
        @game ||= Codebreaker::Game.new
      end
    end

    def main
      Rack::Response.new(render("index.html.erb"))
    end

    def attempt
      @game.attempt
    end
    def compare
      res = @game.compare @request.params['user_code']
      result={:res=>res,:att=>attempt}.to_json
      Rack::Response.new(result)
    end

    def secret_code
      Rack::Response.new(@game.secret_code)
    end

    def hint
      Rack::Response.new(@game.get_hint)
    end

    def render(template)
      path = File.expand_path("views/#{template}")
      ERB.new(File.read(path)).result(binding)
    end

end




