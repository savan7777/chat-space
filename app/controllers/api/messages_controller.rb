class Api::MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @group_mwssages = @group.messages.includes(:user)
    @messages = @group_mwssages.where('id > ?', params[:last_id])
  end
end