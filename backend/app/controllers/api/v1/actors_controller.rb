class Api::V1::ActorsController < ApplicationController
  before_action :find_actor, only: [:update, :delete]

  def index
    @actors = Actor.all
    render json: @actors
  end

  def create
    @actor = Actor.new(actors_params)
    if @actor.save
      render json: @actor
    end
  end

  def update
    @actor.update(actors_params)
    if @actor.save
      render json: @actor, status: :accepted
    else
      render json: { errors: @actor.errors.full_messages }, status: :unprocessible_entity
    end
  end


  private

  def actors_params
    params.require(:actor).permit(:name, :pic_url, :age, :nationality)
  end

  def find_actor
    @actor = Actor.find(params[:id])
  end
end
