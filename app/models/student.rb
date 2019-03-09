class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable
         
         
  def self.from_omniauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create do |student|
        student.token=auth.credentials.token
        student.expires=auth.credentials.expires
        student.expires_at=auth.credentials.expires_at
        student.refresh_token=auth.credentials.refresh_token
      end
    end
end
