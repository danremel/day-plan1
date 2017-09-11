class Api::DaysController < ApplicationController
  def index
    @days = Day.all
    render json: @days
  end

  def show
    @day = Day.find(params[:id])
    @tasks = @day.tasks.all
    render json: {
      day: @artist,
      tasks: @tasks
    }
  end

  def create
    @day = Day.new(day_params)

    if @day.save
      render json: @day
    else
      render json: {
        message: 'Error when creating Day'
      }
    end
  end

  def update
    @day = Day.find(params[:id])
    if @day.update(day_params)
      render json: @day
    else
      render json: {
        message: 'Error when updating Day'
      }
    end
  end

  def destroy
    @day = Day.find(params[:id])
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
