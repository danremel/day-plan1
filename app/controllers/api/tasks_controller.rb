class Api::TasksController < ApplicationController
  def index
    @day = Day.find(params[:day_id])
    @tasks = @day.tasks.all
    render json: @tasks
  end

  def show
    @day = Day.find(params[:day_id])
    @task = @day.task.find(params[:id])
    render json: @task
  end

  def create
    @day = Day.find(params[:day_id])
    @task = @day.task.new

    if @task.save
      render json: @task
    else
      render json: {
        message: 'Error when creating task'
      }
    end
  end

  def update
    @day = Day.find(params[:day_id])
    @task = @day.task.find(params[:id])
    if @task.update
      render json: @task
    else
      render json: {
        message: 'Error when updating task'
      }
    end
  end

  def destroy
    @day = Day.find(params[:day_id])
    @task = @day.task.find(params[:id])
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
