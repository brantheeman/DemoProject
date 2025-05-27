# app/controllers/api/v1/tasks_controller.rb
module Api
  module V1
    class TasksController < ApplicationController
      before_action :authenticate_user!

      def index
        tasks = current_user.tasks
        render json: tasks
      end

      def create
        task = current_user.tasks.new(task_params)
        if task.save
          render json: task, status: :created
        else
          render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def task_params
        params.require(:task).permit(:title, :description, :completed)
      end
    end
  end
end
