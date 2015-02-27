require 'rake/packagetask'
require 'json'

manifest = JSON.parse(File.read(File.join(__dir__, 'manifest.json')))
version = manifest['version']

Rake::PackageTask.new('TJDict', version) do |p|
  p.need_zip = true
  p.package_files.include('*.{js,index,json}', 'css/**/*', 'js/**/*', 'img/**/*')
end