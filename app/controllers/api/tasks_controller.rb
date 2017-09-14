class Api::TasksController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @user = current_user
    @day = @user.days.find(params[:day_id])
    @tasks = @day.tasks.all
    render json: @tasks
  end

  def show
    @user = current_user
    @day = @user.days.find(params[:day_id])
    @task = @day.tasks.find(params[:id])
    render json: @task
  end

  def create
    @user = current_user
    @day = @user.days.find(params[:day_id])
    @task = @day.tasks.create(task_params)
    puts @task
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
    @task = params.require(:task).permit(:name, :description, :priority_level, :completion_time, :completed)
    user_id = {user_id: current_user.id}
    @task.merge(user_id)
  end
end
