from django.db import models
# from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Url(models.Model):
	html_display_name = models.CharField('html_display_name', max_length=120)
	backend_name = models.CharField('backend_name', max_length=120)
	link = models.URLField()

	def __str__(self):
		return self.backend_name

class Image(models.Model):
	image = models.ImageField(upload_to='works/')
	backend_name = models.CharField('backend_name', max_length=120)
	# link = models.URLField()

	def __str__(self):
		return self.backend_name

class Work(models.Model):
	work_id = models.SlugField('id (for urls)', max_length=20, primary_key=True)
	work_type = models.PositiveSmallIntegerField('1: Research, 2: Artwork, 3: Music')
	display_in_press = models.BooleanField('Display in Home.html?', default=False)
	title = models.CharField('Work Title', max_length=120)
	subject = models.CharField('Key Subject', max_length=120)
	summary = models.TextField('Summary', blank=True)
	sub_title = models.TextField('Subtitle', blank=True)
	materials = models.TextField('Materials / Subjects',blank=True)
	date = models.DateField('Work Date')
	display_location = models.TextField('Display / Presentation Location', blank=True)
	# urls = ArrayField(models.URLField(),size=8)
	texts = models.TextField(blank=True)
	urls = models.ManyToManyField(Url, blank=True)
	images = models.ManyToManyField(Image)
	front_image = models.ImageField(upload_to = f'works/fronts/')

	def __str__(self):
		return self.work_id


class ContactLink(models.Model):
	title = models.CharField('Display Title', max_length=120)
	link_type = models.PositiveSmallIntegerField('1: Email, 2: Url', default=1)
	link = models.URLField(blank=True)
	email = models.EmailField(max_length=200,blank=True)
	def __str__(self):
		return self.title

class PortfolioLink(models.Model):
	# title = models.CharField('Display Title', max_length=120)
	# link = models.URLField()
	# work_type = models.PositiveSmallIntegerField('1: Research, 2: Music')
	google_scholar = models.URLField()
	github = models.URLField()
	orcid = models.URLField()
	soundcloud = models.URLField()
	spotify = models.URLField()
	netease = models.URLField()
	update_note = models.CharField('Update Note', max_length=120)

	def __str__(self):
		return self.update_note

class CV(models.Model):
	cv_file = models.FileField(upload_to="cv/")
	date = models.DateField('CV Date')
	def __str__(self):
		return f"CV_{self.date.strftime('%Y_%m_%d')}"


class Bio(models.Model):
	texts = models.TextField(blank=False)
	date = models.DateField('Bio Date')
	def __str__(self):
		return f"bio_{self.date.strftime('%Y_%m_%d')}"


class FileTransfer(models.Model):
	file = models.FileField(upload_to="file/")
	file_name = models.CharField('File Name', max_length=120)
	def __str__(self):
		return self.file_name


class Icon(models.Model):
	icon = models.ImageField(upload_to='icons/')
	date = models.DateField('Icon Date')
	# link = models.URLField()

	def __str__(self):
		return f"icon_{self.date.strftime('%Y_%m_%d')}"


