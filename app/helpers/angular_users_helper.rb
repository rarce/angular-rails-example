module AngularUsersHelper
  def angularize_link html
    raw html.gsub('ID','{{user.id}}')
  end
end
