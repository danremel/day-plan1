class Api::DaysController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @days = current_user.days
    render json: @days
  end

  def show
    @day = current_user.days.find(params[:id])
    @tasks = @day.tasks.all
    render json: {
      day: @day,
      tasks: @tasks
    }
  end

  def create
    @day = current_user.days.new(day_params)

    if @day.save
      render json: @day
    else
      render json: {
        message: 'Error when creating Day'
      }
    end
  end

  def update
    @day = current_user.days.find(params[:id])
    if @day.update(day_params)
      render json: @day
    else
      render json: {
        message: 'Error when updating Day'
      }
    end
  end

  def destroy
    @day = current_user.days.find(params[:id])
    @day.destroy
    render json: {
      message: 'Day successfully deleted'
    }
  end

  private
  def day_params
    params.require(:day).permit(:name, :date)
  end
end
