require "./web_interface"
use Rack::Static, :urls => ["/style"]
use Rack::Reloader
run WebInterface.new