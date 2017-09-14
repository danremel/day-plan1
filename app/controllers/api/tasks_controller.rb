class Api::TasksController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @day = current_user.days.find(params[:day_id])
    @tasks = @day.tasks.all
    render json: @tasks
  end

  def show
    @day = current_user.days.find(params[:day_id])
    @task = @day.tasks.find(params[:id])
    render json: @task
  end

  def create
    @day = current_user.days.find(params[:day_id])
    @task = @day.tasks.new(task_params)

    if @task.save
      render json: @task
    else
      render json: {
        message: 'Error when creating task'
      }
    end
  end

  def update
    @day = current_user.days.find(params[:day_id])
    @task = @day.tasks.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: {
        message: 'Error when updating task'
      }
    end
  end

  def destroy
    @day = current_user.days.find(params[:day_id])
    @task = @day.tasks.find(params[:id])
    @task.destroy
    render json: {
      message: 'Task successfully deleted'
    }
  end


  private
  def task_params
    params.require(:task).permit(:name, :description, :priority_level, :completion_time, :completed)
  end
end
